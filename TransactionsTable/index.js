import { Block } from "baseui/block";
import { Pagination, SIZE } from "baseui/pagination";
import GraphsEmptyState from "components/Graphs/GraphsEmptyState";
import {SearchInput} from "components/Inputs"
import Table from "components/Table";
import { SmallTitle } from "components/Text";
import LangContext from "context/LangContext";
import { useEffect,useState } from "react";
import { useContext } from "react";
import {RiSearchLine} from "react-icons/ri";
import {Col, Row} from "react-simple-flex-grid";

import { emptyStateData } from "./tableOptions";


const Reward = ({ transactionTable, currentPage, totalPages, handlePagination }) => {
    const { currentLangData } = useContext(LangContext);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        setSearchValue("");
    }, [transactionTable]); // Reset search value when new data is passed in

    const filteredTable = transactionTable.filter((transaction) => {
        const values = Object.values(transaction).join("").toLowerCase();
        return values.includes(searchValue.toLowerCase());
    });

    return (
        <div style={{ marginTop: "1.5rem" }}>
            <Row>
                <Col lg={8} md={8} sm={12} style={{ display: "flex", flexDirwction: "row", alignItems: "center", justifyContent: "flex-start" }} xl={8} xs={12} >
                    <SmallTitle>{currentLangData.STATS.TRANSACTIONS_TABLE.title}</SmallTitle>
                </Col>
                <Col lg={4} md={4} sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} xl={4} xs={12} >
                    <RiSearchLine style={{fontSize:"1.9rem", marginBottom:".6rem", color:"#2E58FF"}}/>
                    <SearchInput
                        onChange={handleSearch}
                        placeholder={currentLangData.STATS.TRANSACTIONS_TABLE.search_placeholder}
                        style={{ padding: ".5rem", borderRadius: "1rem", border: "1px solid #ccc" , marginBottom:".5rem", marginLeft:".5rem"}}
                        type="text"
                        value={searchValue}
                    />
                </Col>
            </Row>
            <div
                style={{
                    display: filteredTable.length === 0 ? "grid" : null,
                    gridTemplateColumns: "100%",
                    gridTemplateRows: "100%",
                    boxShadow: filteredTable.length === 0 ? "3px 3px 6px #00000029" : null,
                    borderRadius: filteredTable.length === 0 ? 21 : null,
                    marginTop: filteredTable.length === 0 ? "1rem" : null,
                }}
            >
                <Table
                    data={filteredTable.length === 0 ? emptyStateData : filteredTable}
                    headers={[
                        currentLangData.STATS.TRANSACTIONS_TABLE.text_venue,
                        currentLangData.STATS.TRANSACTIONS_TABLE.text_amount,
                        currentLangData.STATS.TRANSACTIONS_TABLE.financial_institution,
                        currentLangData.STATS.TRANSACTIONS_TABLE.reward_type,
                        currentLangData.STATS.TRANSACTIONS_TABLE.percentage,
                        currentLangData.STATS.TRANSACTIONS_TABLE.cashback,
                        currentLangData.STATS.TRANSACTIONS_TABLE.text_date,
                    ]}
                />
                {filteredTable.length === 0 && <GraphsEmptyState />}
                {filteredTable.length === 0 ? null : (
                    <Block alignItems="center" display="flex" justifyContent="center" width="100%">
                        <Pagination
                            currentPage={currentPage}
                            labels={{
                                prevButton: currentLangData.STATS.TRANSACTIONS_GRAPH.prev_table,
                                nextButton: currentLangData.STATS.TRANSACTIONS_GRAPH.next_table,
                                preposition: currentLangData.STATS.TRANSACTIONS_GRAPH.out_of_table,
                            }}
                            numPages={totalPages}
                            onPageChange={({nextPage}) => handlePagination(nextPage)}
                            size={SIZE.compact}
                        />
                    </Block>
                )}
            </div>
        </div>
    );
};

export default Reward;
