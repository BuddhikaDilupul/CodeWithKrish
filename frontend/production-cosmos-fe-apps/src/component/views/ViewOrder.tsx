import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { TreeNode } from "primereact/treenode";

// Prop interface for view customer
interface Props {
  orders: {
    customerName: string;
    address: string;
    email: string;
    items:{
        productId: string;
        quantity: number;
        productName: string;
        price: string;
    }
  }[];
}
export default function View(props: Props) {
    const [nodes, setNodes] = useState<TreeNode[]>([]);

    useEffect(() => {
        let files = [];

        for (let i = 0; i < 50; i++) {
            let node = {
                key: i,
                data: {
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        key: i + ' - 0',
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            files.push(node);
        }

        setNodes(files);
    }, []);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    return (
        <div className="card">
            <TreeTable value={nodes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>
        </div>
  );
}
