import { Button, Icon } from "@chakra-ui/react";
import { ElementType } from "react";

interface EditButtonProps {
    title: string;
    icon: ElementType;
}

export function EditButton({ title, icon }: EditButtonProps) {
    return (
        <Button
            as={"a"}
            size={"sm"}
            fontSize={"sm"}
            colorScheme={"purple"}
            leftIcon={<Icon as={icon} fontSize={16}/>}
        >
            {title}
        </Button>
    )
}