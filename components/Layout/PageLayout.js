import React from 'react';
import { Container, Left, Right, Header, Title, Body } from 'native-base';
import { Image} from 'react-native';
import NavButton from './NavButton';
import ReportColors from '../../utils/ReportColors';
import { styles } from '../../utils/Style';

export default PageLayout = (props) =>
{
    const {  back, next, children } = props;

    return (
        <Container>
            <Header androidStatusBarColor={ReportColors.primary} style={{ backgroundColor: ReportColors.primary, borderBottomColor: ReportColors.border, borderBottomWidth: 2.5 }} >
                <Left style={styles.header}>
                    {back && <NavButton {...back} />}
                </Left>
                <Body style={styles.header}>
                    <Image source={require('../../images/SMS-Logo.png')} style={styles.logo}/>
                </Body>
                <Right style={styles.header}>
                    {next && <NavButton {...next} />}
                </Right>
            </Header>
            {children}
        </Container>
    );
}