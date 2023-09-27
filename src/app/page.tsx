const metaContent: MetaContent = {
  text: '0P3NS0URCE PR0J3CT5',
  title: 'PORTFOLIO.IO',
  version: 'Version 1.0.0-alpha',
}

export default function HomePage() {
  return (
    <div className="container-100vh">
      <div className="center-xy">
        <small className="fw-bold">{metaContent.text}</small>
        <h1 className="pb-3">{metaContent.title}</h1>
        <a 
          className="btn btn-outline-light text-capitalize fw-bold" 
          href="#"
        > Coming Soon
        </a>
        <div className="d-flex justify-content-end mt-5">
          <small className="fw-bold">&#x1F4E6; {metaContent.version}</small>
        </div>
      </div>
    </div>
  );
}