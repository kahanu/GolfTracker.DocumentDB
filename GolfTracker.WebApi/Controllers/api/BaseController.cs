using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using GolfTracker.WebApi.Repositories;

namespace GolfTracker.WebApi.Controllers.api
{
    /// <summary>
    /// This is the common base ApiController that concrete Api controllers
    /// that need CRUD operations should inherit.
    /// </summary>
    /// <typeparam name="T">The entity type</typeparam>
    public class BaseController<T> : ApiController where T : Entities.EntityBase
    {
        #region ctors

        private readonly IRepository<T> _repo;

        public BaseController(IRepository<T> repo)
        {
            this._repo = repo;
        }

        #endregion

        #region Standard CRUD

        [AllowAnonymous]
        public virtual IEnumerable<T> Get()
        {
            var result = _repo.Get();

            return result;
        }
        
        //[AllowAnonymous]
        //public async Task<IEnumerable<T>> GetAsync()
        //{
        //    var result = await _repo.GetAsync();

        //    return result;
        //}

        public virtual async Task<T> GetById(string id)
        {
            T model = await _repo.GetById(id);
            if (model == null)
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.BadRequest));

            return model;
        }

        //[Authorize]
        public virtual async Task<IHttpActionResult> Post([FromBody]T entity)
        {
            if (ModelState.IsValid)
            {
                var result = await _repo.CreateDocumentAsync(entity);
                var id = result.Resource.Id;
                var model = _repo.GetById(id);

                return Ok(model);
            }
            else
            {
                return BadRequest("Model is invalid.");
            }
        }

        //[Authorize]
        public virtual async Task<IHttpActionResult> Put(string id, [FromBody]T entity)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _repo.UpdateDocumentAsync(entity);
                    var model = _repo.GetById(id);

                    return Ok(model);
                }
                catch (Exception)
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest("Model is invalid.");
            }
        }

        //[Authorize]
        public virtual async Task<IHttpActionResult> Delete(string id)
        {
            try
            {
                await _repo.DeleteDocumentAsync(id);

                return Ok();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        #endregion

    }
}
