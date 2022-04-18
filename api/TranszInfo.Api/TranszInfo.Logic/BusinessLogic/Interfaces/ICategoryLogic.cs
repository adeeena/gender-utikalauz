using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic.Interfaces
{
    public interface ICategoryLogic
    {
        IList<CategoryModel> GetBy(string languageCode);
    }
}
