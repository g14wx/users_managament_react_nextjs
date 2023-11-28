import type { FormInstance } from 'antd';
import {Button, ConfigProvider, Form} from 'antd';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";

interface ISubmitButtonProps {
    form: FormInstance;
    onSuccess?: Dispatch<SetStateAction<boolean>>;
    onSave?: Dispatch<SetStateAction<boolean>>;
}

export default  function SubmitButton({ form, onSuccess, onSave }: ISubmitButtonProps) {

    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    const handleOnClick = () => {
        form.validateFields().then(
            () => {
                if (onSuccess) {
                    onSuccess(true);
                }
                if(onSave){
                    onSave(true);
                }
                form.resetFields();
            }
        );
    }

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);

            },
            () => {
                setSubmittable(false);
            },
        );
    }, [form, onSuccess, values]);

    return ( <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#00b96b',
                borderRadius: 10,
                colorBgContainer: '#f6ffed',
            },
        }}
    >
        <Button type="primary" icon={<PlusOutlined/>} htmlType="submit" disabled={!submittable} onClick={handleOnClick}>
            Save
        </Button>
    </ConfigProvider>
    );
};