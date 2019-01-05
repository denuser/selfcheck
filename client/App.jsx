/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import React from "react"
import { Route, Switch } from 'react-router-dom'
import Tasks from "./components/Tasks.jsx"
import TaskDetails from "./components/TaskDetails.jsx"
import AddTask from "./components/AddTask.jsx"
import NotFound from "./components/NotFound.jsx"
import "./sass/index.scss"

const Outer = styled.div({
    backgroundColor: '#6F81B2',
    backgroundImage: 'linear-gradient(141deg,  #6F81B2 0%, #FF4519 50%, #6F81B2 100%)',
    padding: '15px'
})

const Header = styled.div({})
const HeaderInner = styled.div({
    padding: '20px'
})
const Content = styled.div({
    padding: '20px'
})

const Paper = styled.div({
    //width: '600px',
    backgroundColor: 'white',
    color: 'black',
    //borderRadius: '10px',
    padding: '15px',
    lineHeight: '1.5em',
    margin: '20px 0px 40px 0px',
    boxShadow:
        '0 1px 1px rgba(0,0,0,0.15), 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15), 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)'
})

const App = () => (
    <Outer className="application">
        <div css={{
            background: '#030C24',
        }}>
            <Header>
                <HeaderInner><div><label>Selfcheck App</label></div></HeaderInner>
            </Header>
            <Content>
                <Paper>Emotion is a performant and flexible CSS-in-JS library. It’s inspired by many other CSS-in-JS libraries like glam, glamor, styled-components and glamorous. It allows you to style applications quickly with string styles or object styles. It has predictable composition to avoid specificity issues with CSS. With source maps and labels, Emotion has a great developer experience and great performance with heavy caching and insertRule in production.

Emotion has two main versions, a version specific to React and a vanilla version that is usable without React. Most of the documentation focuses on the React-specific version, but most of the concepts taught in the React-specific version also apply to the vanilla version. The vanilla version of Emotion also works with React, but the React-specific version has many extra useful features that aren’t possible in the vanilla version such as zero-config, server-side-rendering and theming, so it’s recommended to use the React-specific version if you’re using React.

This documentation has lots of live examples that look like this. They’re all editable so you can try Emotion without installing it. Try changing the color below!</Paper>
                <Switch>
                    <Route path="/tasks/:id" exact component={TaskDetails} />
                    <Route path="/add" component={AddTask} />
                    <Route path="/" exact component={Tasks} />
                    <Route component={NotFound} />
                </Switch>
                <Route path="/tasks" component={Tasks} />
            </Content>
        </div>
    </Outer >)

export default App