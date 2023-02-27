import axios from "axios";
import { Block } from "baseui/block";
import { Select } from "baseui/select";
import { DisplaySmall, ParagraphMedium } from "baseui/typography";
// import FullPie from "components/Graphs/fullPieChart.js";
import TransactionsCards from "components/Graphs/transactionsCards";
import { TABLE_SELECT_OVERRIDES, TRANSPARENT_SELECT_OVERRIDES } from "components/Overrides/Input";
import TransactionsTable from "components/TransactionsTable";
import MainContext from "context";
import BusinessCtx from "context/GeneralContext/businessCtx.js";
import VenuesCtx from "context/GeneralContext/venuesCtx";
import LangContext from "context/LangContext";
import { useContext, useEffect, useState } from "react";
import { getMerchantMetrics, getMerchantTransactions } from "services/api/merchantMetrics/index.js";
import { primitives } from "styles/customLightTheme";
import { defaultPeriodFilters, persistentFilterPeriods } from "utils";
import { getCurrency } from "utils/currency/index.js";

import {
  allVenues,
  /*emptyStateData,*/ periods,
} from "../TransactionsTable/tableOptions.js";

const Transactions = () => {
  const contextService = useContext(MainContext);
  const { currentLangData } = useContext(LangContext);

  const { allVenues: allVenuesList } = useContext(VenuesCtx);

  const businessContext = useContext(BusinessCtx)

  const allVenuesOption = allVenues(currentLangData);
  const periodOptions = periods(currentLangData);

  const defaultPeriod = defaultPeriodFilters(periodOptions);

  const [venuesOptions, setVenuesOptions] = useState([allVenuesOption]);
  const [selectedVenue, setSelectedVenue] = useState([allVenuesOption]);
  const [selectedPeriod, setSelectedPeriod] = useState([periodOptions[defaultPeriod]]);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionTable, setTransactionTable] = useState([]);
  const [baseTable, setBaseTable] = useState([]);

  const [pagination, setPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const options = [...allVenuesList, allVenuesOption];
    setVenuesOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVenuesList]);

  useEffect(() => {
    const options = [...allVenuesList, allVenuesOption];
    setVenuesOptions(options);
    const transactionTableArray = [];
    baseTable.forEach((item) => {
      transactionTableArray.push(
        [
          item.venue,
          `${handleMoneyCurrency(item.amount)}`,
          item.financial_institution ? item.financial_institution : "None",
          item.cashback_type === "Bienvenida" ? currentLangData.STATS.TRANSACTIONS_GRAPH.first_time : currentLangData.STATS.TRANSACTIONS_GRAPH.recurrent,
          item.cashback_percentage,
          handleMoneyCurrency(item.cashback_amount),
          handleDateCurency(item.date)
        ]
      );
    });
    setTransactionTable(transactionTableArray);
  }, [currentLangData])

  useEffect(() => {
    const source = axios.CancelToken.source();
    if(selectedVenue.length !== 0) {
      contextService.handleGlobalLoader(true);
      setTransactionData();
      setPagination(1);
      let transactionArray = [];
      let transactionSchema = {
        metrics: {
          last_amountAvg: 0,
          last_amountAvg_diff: 0,
          last_amountSum: 0,
          last_amountSum_cashback: {
            first_time: 0,
            recurring: 0
          },
          last_amountSum_diff: 0,
          last_txs: 0,
          last_txs_diff: 0
        }
      }
      if (selectedVenue[0]._id === "all") {
        getMerchantMetrics("business", businessContext?.currentBusinessId, selectedPeriod[0].slug).then(
          (data)=>{
            if(data !== undefined) {
              transactionArray.push(data)
            }
          }
        );
        handleTablePagination();
        setTimeout(() => {
          transactionArray.forEach((item) => {
            transactionSchema = {
              metrics: {
                last_amountAvg: transactionSchema?.metrics?.last_amountAvg + item.metrics?.last_amountAvg,
                last_amountAvg_diff: transactionSchema?.metrics?.last_amountAvg_diff + item.metrics?.last_amountAvg_diff,
                last_amountSum: transactionSchema?.metrics?.last_amountSum + item.metrics?.last_amountSum,
                last_amountSum_cashback: {
                  first_time: transactionSchema.metrics?.last_amountSum_cashback.first_time + item.metrics?.last_amountSum_cashback.first_time,
                  recurring: transactionSchema.metrics?.last_amountSum_cashback.recurring + item.metrics?.last_amountSum_cashback.recurring
                },
                last_amountSum_diff: transactionSchema?.metrics?.last_amountSum_diff + item.metrics?.last_amountSum_diff,
                last_txs: transactionSchema?.metrics?.last_txs + item.metrics?.last_txs,
                last_txs_diff: transactionSchema?.metrics?.last_txs_diff + item.metrics?.last_txs_diff
              }
            }
          })
          contextService.handleGlobalLoader(false);
          setTransactionData(transactionSchema)
        }, 1500);
      } else {
        getMerchantMetrics(
          "venue",
          selectedVenue[0]._id,
          selectedPeriod[0].slug
        ).then((data) => {
          if(data !== undefined) {
            setTransactionData(data);
            handleTablePagination();
            contextService.handleGlobalLoader(false);
          } else {
            setTransactionData([]);
            setTransactionTable([]);
            contextService.handleGlobalLoader(false);
          }
        });
      }

      return () => {
        source.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVenue, selectedPeriod]);

  useEffect(() => {
    handleTablePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const handleMoneyCurrency = (amount) => {
    const cleanAmount = `${amount?.replace("$", "").replace(",", "")}`
    return getCurrency({ amount: cleanAmount });
  }

  const handleDateCurency = (d) => {
    const unixTime = d;
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString("es-MX")
  }

  const handleTablePagination = () => {
    const typeSearch = selectedVenue[0]._id === "all" ? "business" : "venue";
    const idSearch = selectedVenue[0]._id === "all" ? businessContext?.currentBusinessId : selectedVenue[0]._id;
    const transactionTableArray = [];
    getMerchantTransactions(typeSearch, selectedPeriod[0].slug, idSearch, pagination)
    .then((data) => {
      const total = data?.total / data?.size
      setTotalPages(Math.ceil(total));
      setBaseTable(data?.items);
      data?.items?.forEach((item) => {
        transactionTableArray.push(
          [
            item.venue,
            `${handleMoneyCurrency(item.amount)}`,
            item.financial_institution ? item.financial_institution : "None",
            item.cashback_type === "Bienvenida" ? currentLangData.STATS.TRANSACTIONS_GRAPH.first_time : currentLangData.STATS.TRANSACTIONS_GRAPH.recurrent,
            item.cashback_percentage,
            handleMoneyCurrency(item.cashback_amount),
            handleDateCurency(item.date)
          ]
        );
      });
      setTransactionTable(transactionTableArray);
    });
  }

  return (
    <div>
      {contextService.width <= 549 ? (
        <div style={{ paddingBottom: "1rem" }}>
          <DisplaySmall
            className="no-margin"
            color="secondaryDark"
            style={{
              fontSize: "16px",
              borderBottom: `2px solid ${primitives.primary}`,
              width: "fit-content",
              lineHeight: "17px",
            }}
          >
            {currentLangData.DASHBOARD.LIST_OF_TABS.text_transactions}
          </DisplaySmall>
        </div>
      ) : undefined}
      <Block
        alignItems="center"
        display="flex"
        flexWrap="wrap"
        gridColumnGap="0.5rem"
      >
        <ParagraphMedium
          style={{
            fontSize: contextService.width < 1024 ? "14px" : "16px",
          }}
        >
          {currentLangData.STATS.TRANSACTIONS_TABLE.label_select_venue}
        </ParagraphMedium>
        <Block width="220px">
          <Select
            clearable={false}
            labelKey="name"
            onChange={({ value }) => {
              setSelectedVenue(value);
            }}
            options={venuesOptions}
            overrides={TABLE_SELECT_OVERRIDES}
            placeholder={
              currentLangData.SIDEBAR.MODAL_CONFIGURATION.text_select_venue
            }
            searchable={true}
            value={selectedVenue}
            valueKey="_id"
          />
        </Block>
        <ParagraphMedium
          style={{
            fontSize: contextService.width < 1024 ? "14px" : "16px",
          }}
        >
          {currentLangData.STATS.TRANSACTIONS_TABLE.label_select_date}
        </ParagraphMedium>
        <Select
          clearable={false}
          labelKey="label"
          onChange={({ value }) => {
            setSelectedPeriod(value);
            persistentFilterPeriods(value);
          }}
          options={periodOptions}
          overrides={TRANSPARENT_SELECT_OVERRIDES}
          placeholder={
            currentLangData.SIDEBAR.MODAL_CONFIGURATION.text_select_venue
          }
          searchable={false}
          value={selectedPeriod}
          valueKey="slug"
        />
      </Block>
      <TransactionsCards transactionData={transactionData} />
      {/*<FullPie transactionData={transactionData} />*/}
      <TransactionsTable currentPage={pagination} handlePagination={(page) => setPagination(page)} totalPages={totalPages} transactionTable={transactionTable} />
    </div>
  );
};

export default Transactions;
