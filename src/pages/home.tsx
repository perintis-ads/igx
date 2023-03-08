import { LayoutHome } from '../compoenents/layout-home'

const Home = (props: {title: string }) => {
    return (
      <LayoutHome title={props.title}>

        <section class="jumbotron text-center">
            <div class="container">
                <h1>Welcome to Gramica</h1>
                <h2>Free Instagram viewer and analysis</h2>
                <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                    <a href="#" class="btn btn-primary my-2">Main call to action</a> &nbsp;
                    <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                </p>
            </div>
        </section>

        <div class="container">
          <div class="row">
            <div class="col-12">
              <a href="/profile/therock">Sample profile page</a> : https://www.instagram.com/therock
            </div> 
            <div class="col-12">
              <a href="/media/CpXF52NOgG9">Sample media page</a> : https://www.instagram.com/p/CpXF52NOgG9/
            </div>
            <div class="col-12">
                <a href="/tags/therock">Sample tags page</a> : https://www.instagram.com/explore/tags/therock/
            </div>
            <div class="col-12">
              <a href="/search/therock">Sample search page</a> : https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=therock&rank_token=0.7123456&include_reel=true&search_surface=web_top_search
            </div>
          </div>
        </div>

      </LayoutHome>
    )
}

export default Home;