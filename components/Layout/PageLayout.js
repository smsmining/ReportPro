import React from 'react';
import { Container, Left, Right, Header, Title, Body } from 'native-base';
import { Image} from 'react-native';
import NavButton from './NavButton';
import ReportColors from '../../utils/ReportColors';
import { styles } from '../../utils/Style';
import { GlobalStyles } from '../../utils/Style';

export default PageLayout = (props) =>
{
    const {  back, next, children } = props;

    const imageWidth = Math.min(GlobalStyles.screenWidth.width, 410) / 2.9;
    const imageHeight = imageWidth / 3.4;

    return (
        <Container>
            <Header androidStatusBarColor={ReportColors.primary} style={{ backgroundColor: ReportColors.primary, borderBottomColor: ReportColors.border, borderBottomWidth: 2.5 }} >
                <Left style={styles.header}>
                    {back && <NavButton {...back} />}
                </Left>
                <Body>
                    <Image source={require('../../images/SMS-Logo.png')} style={{ width: imageWidth, height: imageHeight }}/>
                </Body>
                <Right style={styles.header}>
                    {next && <NavButton {...next}  labelStyle = {styles.navText} />}
                </Right>
            </Header>
            {children}
        </Container>
    );
}