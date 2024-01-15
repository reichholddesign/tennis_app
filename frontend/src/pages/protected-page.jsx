import  PageLayout  from "../components/page-layout";


const ProtectedPage = () => {

    return(
        <>
       <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
        </div>
      </div>
    </PageLayout>
        </>
    )
}

export default ProtectedPage
