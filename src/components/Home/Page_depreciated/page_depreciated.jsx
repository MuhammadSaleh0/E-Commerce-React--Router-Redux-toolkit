import "./Page_deprecited.css";

import { useEffect, useRef, useState } from "react"
import useHttp from "../Hooks/use-http";
import Loading from "../Loading/Loading"


const HomePage_Depreciated = () => {

    const { sentRequest, isLoading } = useHttp()
    const [jeans, setJeans] = useState([]);
    const [shirts, setShirts] = useState([]);



    useEffect(() => {
        const getData = async () => {

            const Jeans = await sentRequest();
            const T_shirts = await sentRequest();
            const jeansData = Jeans.slice(5, 10)
            const shirtsData = T_shirts.slice(11, 16)
            setJeans(jeansData)
            setShirts(shirtsData)
            // setData([...jeansData, ...shirtsData])
        }
        getData();
    }, [sentRequest])



    const [current, setCurrent] = useState(0)


    const autoPlayHandler = () => {
        if (jeans && jeans.length > 0) {
            if (current === jeans.length - 1) {
                return setCurrent(0);
            }
            setCurrent(current + 1);
        }
        else {
            return;
        }
    }

    const autoPlay = useRef();

    useEffect(() => {
        autoPlay.current = autoPlayHandler;
    })

    useEffect(() => {
        const play = () => {
            autoPlay.current();
        }
        const interval = setInterval(play, 5800);
        return () => {
            clearInterval(interval);
        }
    }, [])




    let items_jeans;
    let items_shirts;

    if (isLoading) {
        items_jeans = <Loading />
        items_shirts = <Loading />
    } else {


        items_jeans = jeans.map((product, index) => {
            return <div className="item_card item_jeans" key={product.id}>
                {index === current &&

                    <div className="card_content card_content_jeans">

                        <div className="image"
                            style={{ backgroundImage: `url(${product.img_url})` }}
                        >
                        </div>

                        <div className="info">

                            <h3 className="item_cate">{product.category}</h3>

                            <h2 className="item_title">{product.name}</h2>

                            <div className="item_price"><span>$</span>{product.price}</div>

                        </div>

                    </div>

                }
            </div>
        })


        items_shirts = shirts.map((product, index) => {
            return <div className="item_card" key={product.id}>
                {index === current &&

                    <div className="card_content">

                        <div className="image"
                            style={{ backgroundImage: `url(${product.img_url})` }}
                        >
                        </div>

                        <div className="info">

                            <h3 className="item_cate">{product.category}</h3>

                            <h2 className="item_title">{product.name}</h2>

                            {/* <div className="item_rate">
                                <div className="rate">
                                    {product.colour}
                                </div>
                            </div> */}

                            <div className="item_price"><span>$</span>{product.price}</div>

                            {/* <div className="item_description">{product.description}</div> */}

                        </div>

                    </div>

                }
            </div>
        })


    }


    return <div className="homePage">
        {items_jeans}
        {items_shirts}
    </div>
}

export default HomePage_Depreciated;


