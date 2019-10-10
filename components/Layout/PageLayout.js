import React from 'react';
import { Container, Left, Right, Header, Title, Body } from 'native-base';

import NavButton from './NavButton';
import ReportColors from '../../utils/ReportColors';

export default PageLayout = (props) =>
{
    const { back, next, header, children } = props;

    return (
        <Container>
            <Header androidStatusBarColor={ReportColors.primary} style={{ backgroundColor: ReportColors.primary, borderBottomColor: ReportColors.border, borderBottomWidth: 2.5 }} >
                <Left>
                    {back && <NavButton {...back} />}
                </Left>
                <Body>
                    {header && <Title style={{ color: ReportColors.white }}>{header}</Title>}
                </Body>
                <Right>
                    {next && <NavButton {...next} />}
                </Right>
            </Header>
            {children}
        </Container>
    );
}