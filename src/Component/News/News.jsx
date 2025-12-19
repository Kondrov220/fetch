import { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 0 10px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h2`
    font-size: 22px;
    margin-bottom: 15px;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 10px 12px;
    margin-bottom: 12px;
`;

const Link = styled.a`
    font-size: 16px;
    color: #0066cc;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Meta = styled.div`
    margin-top: 6px;
    font-size: 13px;
    color: #555;
    display: flex;
    justify-content: space-between;
`;

class New extends Component {
    state = {
        news: []
    }

    componentDidMount() {
        this.News();
    }

   News = () => {
        fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
            .then(res => res.json())
            .then(data => {
                this.setState({ news: data.hits });
            })
    }

    render() {
        return (
            <Container>
                <Title>Новини</Title>

                {this.state.news.map(obj => (
                    <Card key={obj.objectID}>
                        <Link href={obj.url} target="_blank" rel="noreferrer">
                            {obj.title}
                        </Link>

                        <Meta>
                            <span>Автор: {obj.author}</span>
                            <span>Коментарів: {obj.num_comments}</span>
                        </Meta>
                    </Card>
                ))}
            </Container>
        );
    }
}

export default New;
