using AutoMapper;
using TranszInfo.Domain.Models;

namespace TranszInfo.Logic.Models.Profiles
{
    public class TranslationProfile : Profile
    {
        public TranslationProfile()
        {
            CreateMap<Translation, TranslationModel>()
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.key))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.value));
        }
    }
}
