using AutoMapper;
using TranszInfo.Api.DTOs;
using TranszInfo.Logic.Models;

namespace TranszInfo.Api.DTOs.Profiles
{
    public class SearchResultDtoProfile : Profile
    {
        public SearchResultDtoProfile()
        {
            CreateMap<SearchResultModel, SearchResultDto>()
                .ForMember(dest => dest.Entries, opt => opt.MapFrom(src => src.Entries));
        }
    }
}
