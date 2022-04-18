using TranszInfo.Logic.Models;

namespace TranszInfo.Logic.BusinessLogic.Interfaces
{
    public interface IEntryLogic
    {
        CategoryEntriesResultModel GetBy(string categoryId);

        EntryModel GetById(string entryId);

        SearchResultModel SearchBy(string query);
    }
}
