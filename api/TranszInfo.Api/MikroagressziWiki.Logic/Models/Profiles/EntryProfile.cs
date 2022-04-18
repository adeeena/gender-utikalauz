using AutoMapper;
using TranszInfo.Domain.Models;
using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.Models.Profiles
{
    public class EntryProfile : Profile
    {
        public EntryProfile()
        {
            CreateMap<Entry, EntryModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories))
                .ForMember(dest => dest.Resources, opt => opt.MapFrom(src => src.Entryresources));
        }
    }
}
