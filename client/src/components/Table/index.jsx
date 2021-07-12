import { Table } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export function TableAntd() {
  const [ services, setServices ] = useState([]);
  const [ pagination, setPagination ] = useState({current: 1, pageSize: 5, total: 0});
  
  useEffect(() => {
    const arrayTableServices = [];
    api.get(`/services?page=${1}`).then(resp => {
      resp.data.data.map(service => {
        return arrayTableServices.push({...service, key: service.id})
      })
      setServices(arrayTableServices);
      setPagination({current: 1, pageSize: resp.data.limit, total: resp.data.count})
    })
  }, [])

  async function getServices(pagination) {
    const services = await api.get(`/services?page=${pagination.current}`);
    const arrayTableServices = [];
    await services.data.data.map(service => {
      return arrayTableServices.push({...service, key: service.id})
    })
    setServices(arrayTableServices);
    setPagination({...pagination, total: services.data.count})
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Cliente', dataIndex: 'client', key: 'client' },
    { title: 'Técnico', dataIndex: 'user', key: 'user' },
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    { title: 'Data de Execução', dataIndex: 'date_exec', key: 'date_exec' },
    { title: 'Ações', key: 'operation', render: () => <a>Imprimir</a> },
  ];

   function handleTableChange(pagination) {
    getServices(pagination)
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender: record => <p>{record.observation}</p>,
      rowExpandable: record => record.observation !== '' }}
      pagination={pagination}
      onChange={handleTableChange}
      dataSource={services}
    />
  );
}