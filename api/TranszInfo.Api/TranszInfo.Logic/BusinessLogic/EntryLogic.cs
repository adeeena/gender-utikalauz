using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using TranszInfo.Core.Extensions;
using TranszInfo.Domain.Models;
using TranszInfo.Logic.BusinessLogic.Interfaces;
using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic
{
    public class EntryLogic : IEntryLogic
    {
        #region Properties

        private readonly MikroagressziContext _context;

        private readonly IMapper _mapper;

        private readonly IMemoryCache _memoryCache;

        #endregion

        #region ctor

        public EntryLogic(MikroagressziContext context, IMapper mapper, IMemoryCache memoryCache)
        {
            _context = context;
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

                Category? category = _context.Categories.SingleOrDefault(q => q.Id == categoryId);
                List<Entry>? entries = _context.Entries
                    .Where(q => q.DeletedAt == null && q.Categories.Any(w => w.Id == categoryId)).ToList();

                cacheValue = new CategoryEntriesResultModel
                {
                    Name = category.Name,
                    Description = category.Description,
                    Entries = _mapper.MapCollection<Entry, EntryModel>(entries)
                };

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        public EntryModel GetById(string entryId)
        {
            string CACHE_KEY = "ENTRY_BY_ID_" + entryId;

            if (!_memoryCache.TryGetValue(CACHE_KEY, out EntryModel cacheValue))
            {
                MemoryCacheEntryOptions? cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(20));

                Entry? entry = _context.Entries
                    .Where(q => q.DeletedAt == null)
                    .Include(q => q.Categories)
                    .Include(q => q.Entryresources)
                    .SingleOrDefault(q => q.Id == entryId);

                List<string>? entryRelatedKeywords = entry.Description.Split(' ',
                    StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
                    .OrderByDescending(q => q.Length).Take(3).ToList();

                List<Entry> relatedEntries = new List<Entry>();

                var languageCode = entry.Categories.First().LanguageCode;

                for (int i = 0; i < entryRelatedKeywords.Count(); i++)
                {
                    string? keyword = entryRelatedKeywords[i];

                    if (keyword.Length > 5)
                    {
                        keyword = keyword.Substring(0, 5);
                    }

                    relatedEntries.AddRange(_context.Entries
                        .Where(q =>
                            q.DeletedAt == null && q.Id != entry.Id &&
                            (q.Title.Contains(keyword) || q.Description.Contains(keyword))
                            && q.Categories.Any(w => w.LanguageCode == languageCode))
                        .Take(6).ToList());
                }

                relatedEntries = relatedEntries.DistinctBy(q => q.Id).Take(6).ToList();

                entry.Entryresources =
                    entry.Entryresources.Where(q => !q.DeletedAt.HasValue).ToList();

                // euh do it in correct way TODO
                IList<EntryModel>? relatedEntryModels = _mapper.MapCollection<Entry, EntryModel>(relatedEntries);
                cacheValue = _mapper.Map<Entry, EntryModel>(entry);
                cacheValue.RelatedEntries = relatedEntryModels;

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

                List<Entry>? entries = _context.Entries
                    .Where(q => q.DeletedAt == null && (q.Description.Contains(query) || q.Title.Contains(query))).ToList();

                cacheValue = new SearchResultModel
                {
                    Entries = _mapper.MapCollection<Entry, EntryModel>(entries)
                };

                _memoryCache.Set(CACHE_KEY, cacheValue, cacheEntryOptions);
            }

            return cacheValue;
        }

        #endregion
    }
}
