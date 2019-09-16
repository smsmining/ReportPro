import React from 'react';
import { Container, Left, Right, Header, Title, Body } from 'native-base';

import NavButton from './NavButton';

export default PageLayout = (props) =>
{
    const { back, next, header, children } = props;

    return (
        <Container>
            <Header androidStatusBarColor="#5D4037" >
                <Left>
                    {back && <NavButton {...back} />}
                </Left>
                <Body>
                    {header && <Title>{header}</Title>}
                </Body>
                <Right>
                    {next && <NavButton {...next} />}
                </Right>
            </Header>
            {children}
        </Container>
    );
}