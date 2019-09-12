import React from 'react';
import { Container, Button, Left, Right, Icon, Header, Title, Body } from 'native-base';

const PageLayout = (props) =>
{
    const { back, next, header, children } = props;

    return (
        <Container>
            <Header androidStatusBarColor="#5D4037" >
                <Left>
                    {back &&
                    <Button hasText={back.label} onPress={back.onPress} transparent>
                        {back.icon && <Icon name={back.icon} />}
                        {back.label}
                    </Button>
                    }
                </Left>
                <Body>
                    {header &&
                    <Title>{header}</Title>
                    }
                </Body>
                <Right>
                    {next &&
                    <Button hasText={next.label} onPress={next.onPress} transparent>
                        {next.icon && <Icon name={next.icon} />}
                        {next.label}
                    </Button>
                    }
                </Right>
            </Header>
            {children}
        </Container>
    );
}
export default PageLayout;