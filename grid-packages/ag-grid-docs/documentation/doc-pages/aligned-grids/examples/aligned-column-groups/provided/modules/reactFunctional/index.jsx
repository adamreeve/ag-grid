import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

import { ModuleRegistry } from '@ag-grid-community/core';
// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const topOptions = {
    alignedGrids: [],
    defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100
    }
};
const bottomOptions = {
    alignedGrids: [],
    defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100
    }
};
topOptions.alignedGrids.push(bottomOptions);
bottomOptions.alignedGrids.push(topOptions);

const GridExample = () => {
    const topGridRef = useRef(null);


    const [columnDefs, setColumnDefs] = useState([{
        headerName: 'Group 1',
        headerClass: 'blue',
        groupId: 'Group1',
        children: [
            { field: 'athlete', pinned: true, width: 100 },
            { field: 'age', pinned: true, columnGroupShow: 'open', width: 100 },
            { field: 'country', width: 100 },
            { field: 'year', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 }
        ]
    },
    {
        headerName: 'Group 2',
        headerClass: 'green',
        groupId: 'Group2',
        children: [
            { field: 'athlete', pinned: true, width: 100 },
            { field: 'age', pinned: true, columnGroupShow: 'open', width: 100 },
            { field: 'country', width: 100 },
            { field: 'year', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 }
        ]
    }
    ]);

    const [rowData, setRowData] = useState([]);
    const [gridReady, setGridReady] = useState(0);

    function onGridReady(params) {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => {
                setRowData(data)
                window.setTimeout(() => {
                    // mix up some columns
                    topGridRef.current.columnApi.moveColumnByIndex(11, 4);
                    topGridRef.current.columnApi.moveColumnByIndex(11, 4);
                }, 100);
            });
    }

    function onFirstDataRendered(params) {
        setGridReady(gridReady  + 1);
    };

    useEffect(() => {
        if (gridReady > 1) {
            topGridRef.current.api.sizeColumnsToFit();
        }
    }, [setGridReady])


    return (
        <div className="container">
            <div className="grid ag-theme-alpine">
                <AgGridReact
                    ref={topGridRef}
                    rowData={rowData}
                    gridOptions={topOptions}
                    columnDefs={columnDefs}
                    defaultColDef={{ resizable: true }}
                    onGridReady={params => onGridReady(params)}
                    onFirstDataRendered={params => onFirstDataRendered(params)}
                />
            </div>

            <div className="divider"></div>

            <div className="grid ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    gridOptions={bottomOptions}
                    columnDefs={columnDefs} 
                    onFirstDataRendered={params => onFirstDataRendered(params)}
                />
            </div>
        </div>
    );
}


render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)