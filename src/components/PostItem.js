import React from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";

const PostItem = props => {

    const { Title, Category, Date, Author, Description, Keywords } = props.post

    return (
                <Card body className="bg-secondary py-0 py-md-3">

                    <CardTitle tag="h4" className="mb-0 text-primary">
                        <Link to="#/">{Title}</Link>
                    </CardTitle>

                    <div className="small-text d-md-flex justify">
                        <p className="mr-5 my-1 text-danger">{Date.toDateString()}</p>
                        <p className="mr-5 my-1 text-danger">-{Category}</p>
                        <p className="mr-5 my-1 text-danger">-{Author}</p>
                    </div>

                    <CardText className="mt-3">{Description.Brief}</CardText>
                    <div className="tags d-flex">
                        {Keywords && Keywords.map(keyword => (
                            <p className="px-2 mr-2"># {keyword}</p>
                        ))}

                    </div>
                </Card>
    )
}

export default PostItem
