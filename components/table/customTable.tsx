import type {InputRef} from 'antd';
import {Button, Input, Space, Table} from 'antd';
import type {ColumnsType, ColumnType, TablePaginationConfig} from 'antd/es/table';
import {IPerson, PersonStatus} from "@/redux/slices/peopleManagementSlice/interfaces/IPerson";

import type {FilterConfirmProps, FilterValue} from 'antd/es/table/interface';
import {useRef, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";

import Highlighter from 'react-highlight-words';
import SimpleModal from "@/components/modals/simpleModal";

interface ICustomTableProps {
    people: IPerson[]
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

type DataIndex = keyof IPerson;

export default function CustomTable({people}: ICustomTableProps) {


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState<DataIndex>('');
    const searchInput = useRef<InputRef>(null);




    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IPerson> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };



    const columns: ColumnsType<IPerson> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Favorite Food',
            dataIndex: 'favorite_food',
            key: 'favorite_food',
            sorter: (a, b) => a.favorite_food.localeCompare(b.favorite_food),
            responsive: ['md'],
            ...getColumnSearchProps('favorite_food'),
        },
        {
            title: 'Favorite Movie',
            dataIndex: 'favorite_movie',
            key: 'favorite_movie',
            sorter: (a, b) => a.favorite_movie.localeCompare(b.favorite_movie),
            responsive: ['lg'],
            ...getColumnSearchProps('favorite_movie'),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            responsive: ['lg'],
            ...getColumnSearchProps('updated_at'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.favorite_movie.localeCompare(b.favorite_movie),
            responsive: ['lg'],
            ...getColumnSearchProps('status'),
            render: (text) => <span style={{color: text === PersonStatus.Active ? 'green' : 'red'}}>{text}</span>,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (person) => <SimpleModal personToEdit={person}/>,
        },
    ];


    return (<Table rowKey={"id"} columns={columns} dataSource={people} />);
}
