import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    flexWrap: 'wrap',
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
  },
  tableCellHeader: {
    flex: 1,
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 11,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontWeight: 'lighter',
  },
});

const PdfGeneratorAbsen = ({ data }) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>LAPORAN ABSENSI</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={{ ...styles.tableCellHeader, flex: 0.5 }}>No</Text>
                    <Text style={styles.tableCellHeader}>Tanggal Absensi</Text>
                    <Text style={styles.tableCellHeader}>Email</Text>
                    <Text style={styles.tableCellHeader}>Nama</Text>
                    <Text style={styles.tableCellHeader}>Acara</Text>
                    <Text style={styles.tableCellHeader}>Status</Text>
                  </View>
                  {data.map((post, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={{ ...styles.tableCell, flex: 0.5 }}>{index + 1}</Text>
                      <Text style={styles.tableCell}>{(() => new Date(post.createdAt).toLocaleDateString('en-GB'))()}</Text>
                      <Text style={styles.tableCell}>{post.email}</Text>
                      <Text style={styles.tableCell}>{post.nama}</Text>
                      <Text style={styles.tableCell}>{post.namaAcara}</Text>
                      <Text style={styles.tableCell}>{post.status}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Page>
          </Document>
        }
        fileName="absensi.pdf"
      >
        {({ loading }) => (loading ? 'Loading...' : 'Unduh Disini')}
      </PDFDownloadLink>
    </div>
  );
};

export default PdfGeneratorAbsen;
