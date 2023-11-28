import {Form, FormInstance, Input, Switch} from "antd";
import {PersonStatus} from "@/redux/slices/peopleManagementSlice/interfaces/IPerson";
import {useEffect} from "react";


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    name?: string;
    favorite_food?: string;
    favorite_movie?: string;
    status?: boolean;
};

export default function PersonForm({ form }: { form: FormInstance }) {

    useEffect(() => {
        console.log(form.getFieldValue("status"));
        if(form.getFieldValue("status") === false){
            form.setFieldValue("status", false );
        }
    }, [form]);


    const handleChange = (value: boolean)=> {
        form.setFieldValue("status", value ? PersonStatus.Active : PersonStatus.Inactive );
    }

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="name"
                name="name"
                rules={[{required: true, message: 'Please input person\'s name!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Favorite Food"
                name="favorite_food"
                rules={[{required: true, message: 'Please input your person\'s favorite food!'}]}
            >
                <Input/>
            </Form.Item>


            <Form.Item<FieldType>
                label="Favorite Movie"
                name="favorite_movie"
                rules={[{required: true, message: 'Please input your person\'s favorite movie!'}]}
            >
                <Input/>
            </Form.Item>


            <Form.Item<FieldType>
                label="Status"
                name="status"
            >
                <Switch defaultChecked={form.getFieldValue("status")} onChange={handleChange}/>
            </Form.Item>
        </Form>
    );
}