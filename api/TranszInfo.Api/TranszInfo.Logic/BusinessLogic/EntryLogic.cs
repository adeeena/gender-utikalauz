using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Reflection;
using TranszInfo.Core.Extensions;
using TranszInfo.Domain.Models;
using TranszInfo.Logic.BusinessLogic.Interfaces;
using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic
{
    public class EntryLogic : IEntryLogic
    {
        #region Properties

        private readonly IMapper _mapper;

        private readonly IMemoryCache _memoryCache;

        #endregion

        #region ctor

        public EntryLogic(IMapper mapper, IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _memoryCache = memoryCache;
        }

        #endregion

        #region Additional Methods

        public CategoryEntriesResultModel GetBy(string categoryId)
        {
            string CACHE_KEY = "ENTRIES_BY_CATEGORY_" + categoryId;

            if (!_memoryCache.TryGetValue(CACHE_KEY, out CategoryEntriesResultModel cacheValue))
            {
                MemoryCacheEntryOptions? cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                //Category? category = _context.Categories.SingleOrDefault(q => q.Id == categoryId);
                //List<Entry>? entries = _context.Entries
                //    .Where(q => q.DeletedAt == null && q.Categories.Any(w => w.Id == categoryId)).ToList();

                cacheValue = new CategoryEntriesResultModel
                {
                    //Name = category.Name,
                    //Description = category.Description,
                    //Entries = _mapper.MapCollection<Entry, EntryModel>(entries)
                };

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        public string GetById(string entryId)
        {
            string CACHE_KEY = "ENTRY_BY_ID_" + entryId;

            if (!_memoryCache.TryGetValue(CACHE_KEY, out string cacheValue))
            {
                MemoryCacheEntryOptions? cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                var runDir = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
                var markdownFileContent = File.ReadAllText($"{runDir}/public/hu/{entryId}.md");

                cacheValue = markdownFileContent;

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        public SearchResultModel SearchBy(string query)
        {
            string CACHE_KEY = "ENTRY_SEARCH_BY_ID_" + query;

            if (!_memoryCache.TryGetValue(CACHE_KEY, out SearchResultModel cacheValue))
            {
                MemoryCacheEntryOptions? cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                //List<Entry>? entries = _context.Entries
                //    .Where(q => q.DeletedAt == null && (q.Description.Contains(query) || q.Title.Contains(query))).ToList();

                cacheValue = new SearchResultModel
                {
                    //Entries = _mapper.MapCollection<Entry, EntryModel>(entries)
                };

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        #endregion
    }
}
