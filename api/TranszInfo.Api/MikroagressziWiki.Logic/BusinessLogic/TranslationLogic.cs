using AutoMapper;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Reflection;
using TranszInfo.Core.Extensions;
using TranszInfo.Domain.Models;
using TranszInfo.Logic.BusinessLogic.Interfaces;
using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic
{
    public class TranslationLogic : ITranslationLogic
    {
        #region Properties

        private readonly IMapper _mapper;

        private readonly IMemoryCache _memoryCache;

        #endregion

        #region ctor

        public TranslationLogic(IMapper mapper, IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _memoryCache = memoryCache;
        }

        #endregion

        #region Additional Methods

        public object GetBy(string languageCode)
        {
            string CACHE_KEY = "TRANSLATION_" + languageCode;

            if (true || !_memoryCache.TryGetValue(CACHE_KEY, out object cacheValue))
            {
                MemoryCacheEntryOptions? cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                var runDir = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
                var translationsFile = File.ReadAllText($"{runDir}/public/{languageCode}/translations.json");

                List<Translation> translations = JsonConvert.DeserializeObject<List<Translation>>(translationsFile);

                var translationModels = _mapper.MapCollection<Translation, TranslationModel>(translations);

                cacheValue = JsonConvert.SerializeObject(
                    translationModels.ToDictionary(key => key.Key, v => v.Value));

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        #endregion
    }
}
