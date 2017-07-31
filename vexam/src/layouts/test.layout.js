import React from 'react';

import {
    BrowserRouter as Router, Route, NavLink, Switch, Link
} from 'react-router-dom';



const Home = ()=> (
    <h1>Home</h1>
)


const Roster = ()=> (
    <h1>Roster</h1>
)


const Schedule = () => (
    <h1>Schedule</h1>
)


const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/roster'>Roster</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
        </nav>
    </header>
)



const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/roster' component={Roster} />
            <Route path='/schedule' component={Schedule} />
        </Switch>
    </main>
)




const TestLayout = () => (
        <div>
            <Header />
            <Main />
        </div>

)


export default TestLayout;



