from ticket_manager.app import create_app

if __name__=='__main__':

    app = create_app()
    port_number = 7000
    print('--- Starting Web and Socket Server on port {} ---'.format(port_number))
    app.run(port=port_number, host="0.0.0.0")
