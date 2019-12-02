import React from 'react';
import { FormattedMessage } from 'react-intl';
import Card from 'react-bootstrap/Card'

export default class Detail extends React.Component {

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('peliculasEs') === null)
                this.setState({ peliculasEs: "loading..." })
            else
                this.setState({ peliculasEs: JSON.parse(localStorage.getItem('peliculasEs')) });
        }

        if (!navigator.onLine) {
            if (localStorage.getItem('peliculasEn') === null)
                this.setState({ peliculasEn: "loading..." })
            else
                this.setState({ peliculasEn: JSON.parse(localStorage.getItem('peliculasEn') )});
        }

        fetch("https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json")
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ peliculasEs: res });
                localStorage.setItem('peliculasEs', JSON.stringify(res));
            });

        fetch("https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json")
            .then(res => {
                return res.json();
            }).then(res => {
                console.log(res)
                this.setState({ peliculasEn: res });
                localStorage.setItem('peliculasEn', JSON.stringify(res));
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            peliculasEs: [],
            peliculasEn: []
        }

        this.Detalle = this.Detalle.bind(this)
    }

    Detalle() {
        let itemToShow = {}
        if (navigator.language === "en-US") {
            this.state.peliculasEn.map((item, key) => {
                if (item.id === this.props.id) {
                    itemToShow = item
                }
            }
            );
        }
        else {
            this.state.peliculasEs.map((item, key) => {
                if (item.id === this.props.id) {
                    itemToShow = item
                }
            }
            );
        }

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={itemToShow.poster} />
                <Card.Body>
                    <Card.Title style={{color: "black"}}>
                        {itemToShow.name}
                    </Card.Title>
                    <Card.Text style={{color: "black"}}>
                        {itemToShow.description}
                    </Card.Text>
                </Card.Body>
            </Card>


        )

    }

    render() {
        return (
            <div>
                {this.Detalle()}
            </div>
        )
    }

}