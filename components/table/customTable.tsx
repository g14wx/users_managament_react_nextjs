import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {Key} from "react";

interface DataType {
    key: Key;
    name: string;
    favorite_movie: string;
    favorite_food: string;
    status: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Favorite Food',
        dataIndex: 'favorite_food',
        key: 'favorite_food',
        responsive: ['md'],
    },
    {
        title: 'Favorite Movie',
        dataIndex: 'favorite_movie',
        key: 'favorite_movie',
        responsive: ['lg'],
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        responsive: ['lg'],
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        favorite_movie: 'Mannequin',
        favorite_food: 'Pupusas',
        status: "Active"
    },
];

export default function CustomTable() {
    return (<Table columns={columns} dataSource={data} />);
}
