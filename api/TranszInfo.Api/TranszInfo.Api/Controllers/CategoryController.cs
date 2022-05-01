using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TranszInfo.Api.DTOs;
using TranszInfo.Core.Extensions;
using TranszInfo.Logic.BusinessLogic.Interfaces;
using TranszInfo.Logic.Models;

namespace TranszInfo.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        #region Properties

        private readonly ICategoryLogic _categoryLogic;

        private readonly IMapper _mapper;

        #endregion

        #region ctor

        public CategoryController(
            ICategoryLogic categoryLogic,
            IMapper mapper)
        {
            _categoryLogic = categoryLogic;
            _mapper = mapper;
        }

        #endregion

        #region Exposed endpoints

        [HttpGet("getBy")]
        public string GetBy([FromQuery] string languageCode)
        {
            if (string.IsNullOrEmpty(languageCode))
            {
                throw new ArgumentNullException(nameof(languageCode));
            }

            string categories = _categoryLogic.GetBy(languageCode);

            return categories;//  _mapper.MapCollection<CategoryModel, CategoryDto>(categories);
        }

        #endregion

    }
}