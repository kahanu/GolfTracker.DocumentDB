using System;
using System.Linq;
using GolfTracker.WebApi.Entities;

namespace GolfTracker.WebApi.Repositories
{
    public interface IRepository<T>
     where T : EntityBase
    {
        System.Threading.Tasks.Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> CreateDocumentAsync(T entity);
        System.Threading.Tasks.Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> DeleteDocumentAsync(string id);
        System.Collections.Generic.IEnumerable<T> Get(System.Linq.Expressions.Expression<Func<T, bool>> predicate = null);
        System.Threading.Tasks.Task<T> GetById(string id);
        System.Threading.Tasks.Task<Microsoft.Azure.Documents.Client.ResourceResponse<Microsoft.Azure.Documents.Document>> UpdateDocumentAsync(T entity);
    }
}
