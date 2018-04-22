.PHONY: docs

docs:
	jsdoc -r packages/YARP -r client_packages/YARP -d docs -R README.md
