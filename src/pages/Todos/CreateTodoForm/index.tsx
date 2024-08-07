import { useForm } from "react-hook-form"
import { Box, Button } from "@mui/material"
import { todoSchema } from "../../../validations/todosSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch } from "../../../store/hook"
import { todoAdded } from "../../../store/reducers/todos/todoSlice"
import { CustomDatePicker, Input } from "../../../components"
import { buttonStyle, formStyle } from "./style"
import { FormValues } from "../todoTypes"

const date = new Date()

const CreateTodos = () => {
    const dispatch = useAppDispatch();

    const { handleSubmit, control, formState: {errors} } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            deadline: date.toString()
        },
        resolver: yupResolver(todoSchema),
        mode: "onChange",
    })

    const onSubmit = (data: FormValues) => {
        dispatch(todoAdded(data))
    }

    return (
        <Box sx={formStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input control={control} name={"title"} error={errors.title?.message} />
                <Input control={control} name={"description"} />
                <CustomDatePicker control={control} name={"deadline"}  />
                <Button 
                    type={"submit"} 
                    size="medium" 
                    variant="outlined" 
                    sx={buttonStyle}
                >
                    submit
                </Button>
            </form>
        </Box>
    )
}

export default CreateTodos

