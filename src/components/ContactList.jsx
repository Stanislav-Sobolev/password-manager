import { ButtonStyled, ContactItem } from "./PhoneBook.styled";

export const ContactList = ({filteredArr, deleteContact}) => {
    
    return (
        <ul>
            {
            filteredArr.map(item => 
                <li key={item.id}><ContactItem>{item.name}: {item.number}</ContactItem>
                <ButtonStyled onClick={() => deleteContact(item.id)} >Delete</ButtonStyled> </li>)
            }
        </ul>
    )
}