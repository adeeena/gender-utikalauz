using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic.Interfaces
{
    public interface ITranslationLogic
    {
        object GetBy(string languageCode);
    }
}
