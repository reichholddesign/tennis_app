import  PageLayout  from "../components/page-layout";


const PublicPage = () => {

    return(
        <>
         <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Public Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>public message</strong> from an
              external API.
            </span>
            <span>
              <strong>Any visitor can access this page.</strong>
            </span>
          </p>
        </div>
      </div>
    </PageLayout>
        </>
    )
}

export default PublicPage
