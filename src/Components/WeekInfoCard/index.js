import React, {useState, useEffect} from 'react';
import  {UseWeatherAppContext} from '../../Context/Context';
import SingleCardComponents from '../SingleCard';
import axios from 'axios';

const WeekInfoCardComponents = ()=>{
    const [show, setShow] = useState(false);

    let {state:{daily}, dispatch} = UseWeatherAppContext();
    const [selectedCard, setSelectedCard] = useState(0);
    //console.log('daily', daily, 'current',current, UseWeatherAppContext());
    const updateCurrent = ()=>{
        return (
            dispatch({
                type:'SET_CURRENT',
                payload:daily[selectedCard]
            })
        )
    }
   useEffect(() => {
        updateCurrent();
        // eslint-disable-next-line
      }, [daily, selectedCard]);
    return (
        <>
            <div className='cardWrap'>
                <ul className='cardList'>
                    {
                      !show &&daily && daily.length > 0 ? daily.map((item, index)=>{
                        if (index < 3){
                            return (
                                    <SingleCardComponents className={index === selectedCard ? "active" : ""} onClick={()=>{
                                        setSelectedCard(index)
                                        updateCurrent();
                                    }} item={item} key={index} />
                                )
                        }
                        return '';
                            
                        }) : ''
                    }
                    {

                        show && daily && daily.length > 0 ? daily.map((item, index)=>{
                            if (index < 7){
                                return (
                                        <SingleCardComponents className={index === selectedCard ? "active" : ""} onClick={()=>{
                                            setSelectedCard(index)
                                            updateCurrent();
                                        }} item={item} key={index} />
                                    )
                            }
                            return '';
                                
                            }) : ''
                    }
                </ul>
               
            </div>
            <div>
                <button type='button' onClick={() => setShow
                (!show)}>View more</button>
            </div>
        </>
    )
}

export default WeekInfoCardComponents;