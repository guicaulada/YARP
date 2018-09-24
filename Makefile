.PHONY: docs

docs:
	rm -r YARP_docs/docs
	jsdoc -r packages/YARP -r client_packages/YARP -d YARP_docs/docs -R README.md
	cp README.md YARP_docs/README.md
