using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TranszInfo.Api.DTOs;
using TranszInfo.Logic.BusinessLogic.Interfaces;
using TranszInfo.Logic.Models;

namespace TranszInfo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntryController : ControllerBase
    {
        #region Properties

        private readonly IEntryLogic _entryLogic;

        private readonly IMapper _mapper;

        #endregion

        #region ctor

        public EntryController(IEntryLogic entryLogic, IMapper mapper)
        {
            _entryLogic = entryLogic;
            _mapper = mapper;
        }

        #endregion

        #region Exposed endpoints

        [HttpGet("getBy")]
        public CategoryEntriesResultDto GetBy([FromQuery] string categoryId)
        {
            if (string.IsNullOrEmpty(categoryId))
            {
                throw new ArgumentNullException(nameof(categoryId));
            }

            CategoryEntriesResultModel? result = _entryLogic.GetBy(categoryId);
            return _mapper.Map<CategoryEntriesResultModel, CategoryEntriesResultDto>(result);
        }

        [HttpGet("getById")]
        public EntryDto GetById([FromQuery] string entryId)
        {
            if (string.IsNullOrEmpty(entryId))
            {
                throw new ArgumentNullException(nameof(entryId));
            }

            EntryModel? entry = _entryLogic.GetById(entryId);
            return _mapper.Map<EntryModel, EntryDto>(entry);
        }

        [HttpGet("searchBy")]
        public SearchResultDto searchBy([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                throw new ArgumentNullException(nameof(query));
            }

            SearchResultModel? result = _entryLogic.SearchBy(query);
            return _mapper.Map<SearchResultModel, SearchResultDto>(result);
        }

        #endregion
    }
}