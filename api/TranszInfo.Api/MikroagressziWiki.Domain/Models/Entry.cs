using System;
using System.Collections.Generic;

namespace TranszInfo.Domain.Models
{
    public partial class Entry
    {
        public Entry()
        {
            Entryresources = new HashSet<Entryresource>();
            Categories = new HashSet<Category>();
        }

        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ModifiedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public virtual ICollection<Entryresource> Entryresources { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
    }
}
