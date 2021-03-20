import React from 'react';
import Card from './ProductCard';

interface Props
{

}

const Home = ( props: Props ) =>
{
    return (
        <div>
            <Card name={ `test` } price={ 100 } currency={ [ 'lei' ] } details="asd" />
        </div>
    );
};

export default Home;
