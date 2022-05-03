import { Col, Container, Row } from 'react-bootstrap';

export default function Listing({filteredResults, handleClick}) {

  return (
    <Container id="listing-container" className={`${filteredResults&&"mt-5"} px-4`}>
			{filteredResults.map(listing => {
				return(
					<Row key={listing.id} className={`listing-item ${listing.featured&&"isFeatured"} mb-sm-4 mb-5 p-sm-4 py-4 px-2 position-relative`}>
						<Col className='d-flex flex-sm-row flex-column' md={6} xs={12}>
							<div className='logo me-sm-4'><img src={listing.logo} alt='logo'/></div>
							<div className='company-info-container align-self-sm-center my-sm-0 my-4'>
								<div className='top-info'>
									<span className='company'>{listing.company}</span>
									{listing.new&&<span className='new text-uppercase'>New!</span>}
									{listing.featured&&<span className='featured text-uppercase'>Featured</span>}
								</div>
								<div className='position my-1'>{listing.position}</div>
								<div className='bottom-info'>
									<span className='postedAt me-lg-4 me-3'>{listing.postedAt}</span>
									<span className='contract me-lg-4 me-3'>{listing.contract}</span>
									<span className='location'>{listing.location}</span>
								</div>
							</div>
							</Col>
							<Col className='job-info-container d-flex align-items-center flex-wrap justify-content-md-end justify-content-sm-center mt-md-0 mt-sm-3' md={6} xs={12}>
								<span className='role tag py-1 px-2 m-1' onClick={(e) => handleClick(e, listing.id)}>{listing.role}</span>
								<span className='level tag py-1 px-2 m-1' onClick={(e) => handleClick(e, listing.id)}>{listing.level}</span>
								{listing.languages.map((language, id) => <span key={id} className={`language tag py-1 px-2 m-1`} onClick={(e) => handleClick(e, listing.id)}>{language}</span>)}
								{listing.tools&&listing.tools.map((tool, id) => <span key={id} className={`tools tag py-1 px-2 m-1`} onClick={(e) => handleClick(e, listing.id)}>{tool}</span>)}
						</Col>
					</Row>
				)
			})}
		</Container>
  )
}
