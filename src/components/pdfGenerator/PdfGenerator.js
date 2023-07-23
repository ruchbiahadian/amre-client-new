import React from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    fontSize: 14, // Reduce header font size for a cleaner look
    marginBottom: 10,
    fontWeight: 'bold', // Use a bolder font weight for the header
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
    fontSize: 11, // Reduce the table header font size
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1, // Add bottom border to header cells
    borderColor: '#000', // Set the border color to black
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontWeight: 'bold', // Use a bolder font weight for the header cells
  },
  tableCell: {
    flex: 1,
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10, // Reduce the table body font size for a cleaner look
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1, // Add bottom border to body cells
    borderColor: '#000', // Set the border color to black
    textAlign: 'center',
    fontWeight: 'lighter', // Use a lighter font weight for the body cells
  },
});

const PdfGenerator = ({ data }) => {
  const generatePdfBlobURL = () => {
    const pdfBlob = new Blob(
      [
        <PDFViewer>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>LAPORAN REIMBURSEMENT</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={{ ...styles.tableCellHeader, flex: 0.5 }}>No</Text>
                    <Text style={styles.tableCellHeader}>Nama</Text>
                    <Text style={styles.tableCellHeader}>Total Reimbursement</Text>
                    <Text style={styles.tableCellHeader}>Kategori / Acara</Text>
                    <Text style={styles.tableCellHeader}>Nomor Rekening</Text>
                    <Text style={styles.tableCellHeader}>Bank</Text>
                    <Text style={styles.tableCellHeader}>Status Reimbursement</Text>
                  </View>
                  {data.map((post, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={{ ...styles.tableCell, flex: 0.5 }}>{index + 1}</Text>
                      <Text style={styles.tableCell}>{post.nama}</Text>
                      <Text style={styles.tableCell}>{post.total_nominal}</Text>
                      <Text style={styles.tableCell}>{post.kategori}</Text>
                      <Text style={styles.tableCell}>{post.nomor}</Text>
                      <Text style={styles.tableCell}>{post.bank}</Text>
                      <Text style={styles.tableCell}>{post.rm_status}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>,
      ],
      { type: 'application/pdf' }
    );

    return URL.createObjectURL(pdfBlob);
  };

  const pdfBlobURL = generatePdfBlobURL();

  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>LAPORAN REIMBURSEMENT</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={{ ...styles.tableCellHeader, flex: 0.5 }}>No</Text>
                    <Text style={styles.tableCellHeader}>Nama</Text>
                    <Text style={styles.tableCellHeader}>Total Reimbursement</Text>
                    <Text style={styles.tableCellHeader}>Kategori / Acara</Text>
                    <Text style={styles.tableCellHeader}>Nomor Rekening</Text>
                    <Text style={styles.tableCellHeader}>Bank</Text>
                    <Text style={styles.tableCellHeader}>Status Reimbursement</Text>
                  </View>
                  {data.map((post, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={{ ...styles.tableCell, flex: 0.5 }}>{index + 1}</Text>
                      <Text style={styles.tableCell}>{post.nama}</Text>
                      <Text style={styles.tableCell}>{post.total_nominal}</Text>
                      <Text style={styles.tableCell}>{post.kategori}</Text>
                      <Text style={styles.tableCell}>{post.nomor}</Text>
                      <Text style={styles.tableCell}>{post.bank}</Text>
                      <Text style={styles.tableCell}>{post.rm_status}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Page>
          </Document>
        }
        fileName="reimbursement.pdf"
      >
        {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download PDF')}
      </PDFDownloadLink>

      <iframe
        src={pdfBlobURL}
        title="Generated PDF"
        style={{ display: 'none' }}
        onLoad={() => URL.revokeObjectURL(pdfBlobURL)}
      />
    </div>
  );
};

export default PdfGenerator;
