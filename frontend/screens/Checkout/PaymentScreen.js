import React, { useState } from "react";
import { View, Button } from "react-native";
import {
  Text,
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";
import CartButton from "../../components/UI/CartButton";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const PaymentScreen = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose you payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem key={item.name} onPress={() => setSelected(item.value)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected === 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name={"arrow-down"} />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonTextStyle={{ color: "grey" }}
            headerTitleStyle={{ color: "grey" }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((card, index) => {
              return (
                <Picker.Item
                  key={card.name}
                  label={card.name}
                  value={card.value}
                />
              );
            })}
          </Picker>
        ) : null}
        <CartButton
          isDisabled={
            (selected == 1 || selected == 2 || (selected === 3 && card)) &&
            order !== undefined
              ? false
              : true
          }
          style={
            (selected == 1 || selected == 2 || (selected === 3 && card)) &&
            order !== undefined
              ? ""
              : { opacity: 0.2 }
          }
          actionToDo={() => props.navigation.navigate("Confirm", { order })}
          btnText="Confirm"
        />
        {order !== undefined ? null : (
          <View style={{ alignItems: "center", marginTop: 5 }}>
            <Text style={{ color: "red", fontSize: 14 }}>
              You need to add your shipping address
            </Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default PaymentScreen;
