import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "../components/Card";


function ListView({ dataSource, filterCategory }) {
    console.log('listview', dataSource);
    return (
        <div className="listview-container">
            {dataSource.length > 0 ? (
                dataSource.map((business) => (
                    <Card
                        key={business.id}
                        data={business}
                        filterCategory={filterCategory}
                    />
                ))
            ) : (
                <label data-testid="no-result">No results, try another one.</label>
            )}
        </div>
    );

    // return (
    //   <main className="App">
    //     {data.business.map((e) => {
    //       return <Card key={e.id} item={e} />;
    //     })}
    //   </main>
    // );
}

export default ListView;
