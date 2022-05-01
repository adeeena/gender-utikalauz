using AutoMapper;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TranszInfo.Core.Extensions;
using TranszInfo.Domain.Models;
using TranszInfo.Logic.BusinessLogic.Interfaces;
using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic
{
    public class CategoryLogic : ICategoryLogic
    {
        #region Properties

        private readonly MikroagressziContext _context;

        private readonly IMapper _mapper;

        private readonly IMemoryCache _memoryCache;

        #endregion

        #region ctor

        public CategoryLogic(IMapper mapper, IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _memoryCache = memoryCache;
        }

        #endregion

        #region Additional methods

        public string GetBy(string languageCode)
        {
            string CACHE_KEY = "CATEGORIES_BY_" + languageCode;

            if (!_memoryCache.TryGetValue(CACHE_KEY, out string cacheValue))
            {
                MemoryCacheEntryOptions? cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                var runDir = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
                var markdownFileContent = File.ReadAllText($"{runDir}/public/hu/_sidebar.json");

                cacheValue = markdownFileContent;

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        #endregion
    }
}
