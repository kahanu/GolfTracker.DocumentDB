using System;
﻿using System.Text;
﻿using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using GolfTracker.WebApi.Entities;

namespace GolfTracker.WebApi.Repositories
{
    public interface IRepository<T>
     where T : EntityBase
    {
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> CreateDocumentAsync(T entity);
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> DeleteDocumentAsync(string id);
        IEnumerable<T> Get(System.Linq.Expressions.Expression<Func<T, bool>> predicate = null);
        Task<T> GetById(string id);
        Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> UpdateDocumentAsync(T entity);
    }
}
