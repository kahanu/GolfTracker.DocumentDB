using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using GolfTracker.WebApi.Entities.GolfClubs;
using GolfTracker.WebApi.Repositories;

namespace GolfTracker.WebApi.Controllers.api
{
    //[Authorize]
    [RoutePrefix("api/golfclub")]
    public class GolfClubController : BaseController<GolfClub>
    {
        #region ctors

        private readonly IGolfClubRepository _repo;

        public GolfClubController(IGolfClubRepository repo):base(repo)
        {
            this._repo = repo;
        }

        #endregion

        //#region Standard CRUD - these aren't needed here since the CRUD operations are in the BaseController

        //[AllowAnonymous]
        //public IEnumerable<GolfClub> Get()
        //{
        //    var result = _repo.Get();

        //    return result;
        //}

        //public Task<GolfClub> GetById(string id)
        //{
        //    return _repo.GetById(id);
        //}

        //public async Task<IHttpActionResult> Post([FromBody]GolfClub entity)
        //{
        //    var result = await _repo.CreateDocumentAsync(entity);
        //    var id = result.Resource.Id;
        //    var model = _repo.GetById(id);

        //    return Ok(model);
        //}

        //public async Task<IHttpActionResult> Put(string id, [FromBody]GolfClub entity)
        //{
        //    await _repo.UpdateDocumentAsync(entity);
        //    var model = _repo.GetById(id);

        //    return Ok(model);
        //}

        //public async Task<IHttpActionResult> Delete(string id)
        //{
        //    await _repo.DeleteDocumentAsync(id);

        //    return Ok();
        //}
        //#endregion

    }
}
