using AutoMapper;
using TranszInfo.Api.DTOs;
using TranszInfo.Logic.Models;

namespace TranszInfo.Api.DTOs.Profiles
{
    public class EntryResourceDtoProfile : Profile
    {
        public EntryResourceDtoProfile()
        {
            CreateMap<EntryResourceModel, EntryResourceDto>()
                .ForMember(dest => dest.ResourceId, opt => opt.MapFrom(src => src.ResourceId))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Link, opt => opt.MapFrom(src => src.Link));
        }
    }
}
